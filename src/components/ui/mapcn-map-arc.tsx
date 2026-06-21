"use client";

import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type * as GeoJSON from "geojson";


function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

type Theme = "light" | "dark";

// Check document class for theme (works with next-themes, etc.)
function getDocumentTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  return null;
}

// Get system preference
function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useResolvedTheme(themeProp?: "light" | "dark"): Theme {
  const [detectedTheme, setDetectedTheme] = useState<Theme>(
    () => getDocumentTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    if (themeProp) return;

    const observer = new MutationObserver(() => {
      const docTheme = getDocumentTheme();
      if (docTheme) {
        setDetectedTheme(docTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!getDocumentTheme()) {
        setDetectedTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [themeProp]);

  return themeProp ?? detectedTheme;
}

type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

type MapViewport = {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
};

type MapStyleOption = string | MapLibreGL.StyleSpecification;

type MapRef = MapLibreGL.Map;

type MapProps = {
  children?: ReactNode;
  className?: string;
  theme?: Theme;
  styles?: {
    light?: MapStyleOption;
    dark?: MapStyleOption;
  };
  projection?: MapLibreGL.ProjectionSpecification;
  viewport?: Partial<MapViewport>;
  onViewportChange?: (viewport: MapViewport) => void;
  loading?: boolean;
} & Omit<MapLibreGL.MapOptions, "container" | "style">;

function DefaultLoader() {
  return (
    <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-xs">
      <div className="flex gap-1">
        <span className="bg-muted-foreground/60 size-1.5 animate-pulse rounded-full" />
        <span className="bg-muted-foreground/60 size-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
        <span className="bg-muted-foreground/60 size-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function getViewport(map: MapLibreGL.Map): MapViewport {
  const center = map.getCenter();
  return {
    center: [center.lng, center.lat],
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
  };
}

export const Map = forwardRef<MapRef, MapProps>(function Map(
  {
    children,
    className,
    theme: themeProp,
    styles,
    projection,
    viewport,
    onViewportChange,
    loading = false,
    ...props
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const currentStyleRef = useRef<MapStyleOption | null>(null);
  const styleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const internalUpdateRef = useRef(false);
  const resolvedTheme = useResolvedTheme(themeProp);

  const isControlled = viewport !== undefined && onViewportChange !== undefined;

  const onViewportChangeRef = useRef(onViewportChange);
  onViewportChangeRef.current = onViewportChange;

  const mapStyles = useMemo(
    () => ({
      dark: styles?.dark ?? defaultStyles.dark,
      light: styles?.light ?? defaultStyles.light,
    }),
    [styles],
  );

  useImperativeHandle(ref, () => mapInstance as MapLibreGL.Map, [mapInstance]);

  const clearStyleTimeout = useCallback(() => {
    if (styleTimeoutRef.current) {
      clearTimeout(styleTimeoutRef.current);
      styleTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const initialStyle =
      resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    currentStyleRef.current = initialStyle;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: initialStyle,
      renderWorldCopies: false,
      attributionControl: {
        compact: true,
      },
      ...props,
      ...viewport,
    });

    const styleDataHandler = () => {
      clearStyleTimeout();
      styleTimeoutRef.current = setTimeout(() => {
        setIsStyleLoaded(true);
        if (projection) {
          map.setProjection(projection);
        }
      }, 100);
    };
    const loadHandler = () => setIsLoaded(true);

    const handleMove = () => {
      if (internalUpdateRef.current) return;
      onViewportChangeRef.current?.(getViewport(map));
    };

    map.on("load", loadHandler);
    map.on("styledata", styleDataHandler);
    map.on("move", handleMove);
    setMapInstance(map);

    return () => {
      clearStyleTimeout();
      map.off("load", loadHandler);
      map.off("styledata", styleDataHandler);
      map.off("move", handleMove);
      map.remove();
      setIsLoaded(false);
      setIsStyleLoaded(false);
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapInstance || !isControlled || !viewport) return;
    if (mapInstance.isMoving()) return;

    const current = getViewport(mapInstance);
    const next = {
      center: viewport.center ?? current.center,
      zoom: viewport.zoom ?? current.zoom,
      bearing: viewport.bearing ?? current.bearing,
      pitch: viewport.pitch ?? current.pitch,
    };

    if (
      next.center[0] === current.center[0] &&
      next.center[1] === current.center[1] &&
      next.zoom === current.zoom &&
      next.bearing === current.bearing &&
      next.pitch === current.pitch
    ) {
      return;
    }

    internalUpdateRef.current = true;
    mapInstance.jumpTo(next);
    internalUpdateRef.current = false;
  }, [mapInstance, isControlled, viewport]);

  useEffect(() => {
    if (!mapInstance || !resolvedTheme) return;

    const newStyle =
      resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;

    if (currentStyleRef.current === newStyle) return;

    clearStyleTimeout();
    currentStyleRef.current = newStyle;
    setIsStyleLoaded(false);

    mapInstance.setStyle(newStyle, { diff: true });
  }, [mapInstance, resolvedTheme, mapStyles, clearStyleTimeout]);

  const contextValue = useMemo(
    () => ({
      map: mapInstance,
      isLoaded: isLoaded && isStyleLoaded,
    }),
    [mapInstance, isLoaded, isStyleLoaded],
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn("relative h-full w-full", className)}
      >
        {(!isLoaded || loading) && <DefaultLoader />}
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});

type MapArcDatum = {
  id: string | number;
  from: [number, number];
  to: [number, number];
};

type MapArcEvent<T extends MapArcDatum = MapArcDatum> = {
  arc: T;
  longitude: number;
  latitude: number;
  originalEvent: MapLibreGL.MapMouseEvent;
};

type MapArcLinePaint = NonNullable<MapLibreGL.LineLayerSpecification["paint"]>;
type MapArcLineLayout = NonNullable<
  MapLibreGL.LineLayerSpecification["layout"]
>;

type MapArcProps<T extends MapArcDatum = MapArcDatum> = {
  data: T[];
  id?: string;
  curvature?: number;
  samples?: number;
  paint?: MapArcLinePaint;
  layout?: MapArcLineLayout;
  hoverPaint?: MapArcLinePaint;
  onClick?: (e: MapArcEvent<T>) => void;
  onHover?: (e: MapArcEvent<T> | null) => void;
  interactive?: boolean;
  beforeId?: string;
};

const DEFAULT_ARC_CURVATURE = 0.2;
const DEFAULT_ARC_SAMPLES = 64;
const ARC_HIT_MIN_WIDTH = 12;
const ARC_HIT_PADDING = 6;

const DEFAULT_ARC_PAINT: MapArcLinePaint = {
  "line-color": "#4285F4",
  "line-width": 2,
  "line-opacity": 0.85,
};

const DEFAULT_ARC_LAYOUT: MapArcLineLayout = {
  "line-join": "round",
  "line-cap": "round",
};

function mergeArcPaint(
  paint: MapArcLinePaint,
  hoverPaint: MapArcLinePaint | undefined,
): MapArcLinePaint {
  if (!hoverPaint) return paint;
  const merged: Record<string, unknown> = { ...paint };
  for (const [key, hoverValue] of Object.entries(hoverPaint)) {
    if (hoverValue === undefined) continue;
    const baseValue = merged[key];
    merged[key] =
      baseValue === undefined
        ? hoverValue
        : [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            hoverValue,
            baseValue,
          ];
  }
  return merged as MapArcLinePaint;
}

function buildArcCoordinates(
  from: [number, number],
  to: [number, number],
  curvature: number,
  samples: number,
): [number, number][] {
  const [x0, y0] = from;
  const [x2, y2] = to;
  const dx = x2 - x0;
  const dy = y2 - y0;
  const distance = Math.hypot(dx, dy);

  if (distance === 0 || curvature === 0) return [from, to];

  const mx = (x0 + x2) / 2;
  const my = (y0 + y2) / 2;
  const nx = -dy / distance;
  const ny = dx / distance;
  const offset = distance * curvature;
  const cx = mx + nx * offset;
  const cy = my + ny * offset;

  const points: [number, number][] = [];
  const segments = Math.max(2, Math.floor(samples));
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const inv = 1 - t;
    const x = inv * inv * x0 + 2 * inv * t * cx + t * t * x2;
    const y = inv * inv * y0 + 2 * inv * t * cy + t * t * y2;
    points.push([x, y]);
  }
  return points;
}

export function MapArc<T extends MapArcDatum = MapArcDatum>({
  data,
  id: propId,
  curvature = DEFAULT_ARC_CURVATURE,
  samples = DEFAULT_ARC_SAMPLES,
  paint,
  layout,
  hoverPaint,
  onClick,
  onHover,
  interactive = true,
  beforeId,
}: MapArcProps<T>) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `arc-source-${id}`;
  const layerId = `arc-layer-${id}`;
  const hitLayerId = `arc-hit-layer-${id}`;

  const mergedPaint = useMemo(
    () => mergeArcPaint({ ...DEFAULT_ARC_PAINT, ...paint }, hoverPaint),
    [paint, hoverPaint],
  );
  const mergedLayout = useMemo(
    () => ({ ...DEFAULT_ARC_LAYOUT, ...layout }),
    [layout],
  );

  const hitWidth = useMemo(() => {
    const w = paint?.["line-width"] ?? DEFAULT_ARC_PAINT["line-width"];
    const base = typeof w === "number" ? w : ARC_HIT_MIN_WIDTH;
    return Math.max(base + ARC_HIT_PADDING, ARC_HIT_MIN_WIDTH);
  }, [paint]);

  const geoJSON = useMemo<GeoJSON.FeatureCollection<GeoJSON.LineString>>(
    () => ({
      type: "FeatureCollection",
      features: data.map((arc) => {
        const { from, to, ...properties } = arc;
        return {
          type: "Feature",
          properties,
          geometry: {
            type: "LineString",
            coordinates: buildArcCoordinates(from, to, curvature, samples),
          },
        };
      }),
    }),
    [data, curvature, samples],
  );

  const latestRef = useRef({ data, onClick, onHover });
  latestRef.current = { data, onClick, onHover };

  useEffect(() => {
    if (!isLoaded || !map) return;

    map.addSource(sourceId, {
      type: "geojson",
      data: geoJSON,
      promoteId: "id",
    });

    map.addLayer(
      {
        id: hitLayerId,
        type: "line",
        source: sourceId,
        layout: DEFAULT_ARC_LAYOUT,
        paint: {
          "line-color": "rgba(0, 0, 0, 0)",
          "line-width": hitWidth,
          "line-opacity": 1,
        },
      },
      beforeId,
    );

    map.addLayer(
      {
        id: layerId,
        type: "line",
        source: sourceId,
        layout: mergedLayout,
        paint: mergedPaint,
      },
      beforeId,
    );

    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getLayer(hitLayerId)) map.removeLayer(hitLayerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, map]);

  useEffect(() => {
    if (!isLoaded || !map) return;
    const source = map.getSource(sourceId) as
      | MapLibreGL.GeoJSONSource
      | undefined;
    source?.setData(geoJSON);
  }, [isLoaded, map, geoJSON, sourceId]);

  useEffect(() => {
    if (!isLoaded || !map || !map.getLayer(layerId)) return;
    for (const [key, value] of Object.entries(mergedPaint)) {
      map.setPaintProperty(
        layerId,
        key as keyof MapArcLinePaint,
        value as never,
      );
    }
    for (const [key, value] of Object.entries(mergedLayout)) {
      map.setLayoutProperty(
        layerId,
        key as keyof MapArcLineLayout,
        value as never,
      );
    }
    if (map.getLayer(hitLayerId)) {
      map.setPaintProperty(hitLayerId, "line-width", hitWidth);
    }
  }, [isLoaded, map, layerId, hitLayerId, mergedPaint, mergedLayout, hitWidth]);

  useEffect(() => {
    if (!isLoaded || !map || !interactive) return;

    let hoveredId: string | number | null = null;

    const setHover = (next: string | number | null) => {
      if (next === hoveredId) return;
      const sourceExists = !!map.getSource(sourceId);
      if (hoveredId != null && sourceExists) {
        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: false },
        );
      }
      hoveredId = next;
      if (next != null && sourceExists) {
        map.setFeatureState({ source: sourceId, id: next }, { hover: true });
      }
    };

    const findArc = (featureId: string | number | undefined) =>
      featureId == null
        ? undefined
        : latestRef.current.data.find(
            (arc) => String(arc.id) === String(featureId),
          );

    const handleMouseMove = (e: MapLibreGL.MapLayerMouseEvent) => {
      const featureId = e.features?.[0]?.id as string | number | undefined;
      if (featureId == null || featureId === hoveredId) return;

      setHover(featureId);
      map.getCanvas().style.cursor = "pointer";

      const arc = findArc(featureId);
      if (arc) {
        latestRef.current.onHover?.({
          arc: arc as T,
          longitude: e.lngLat.lng,
          latitude: e.lngLat.lat,
          originalEvent: e,
        });
      }
    };

    const handleMouseLeave = () => {
      setHover(null);
      map.getCanvas().style.cursor = "";
      latestRef.current.onHover?.(null);
    };

    const handleClick = (e: MapLibreGL.MapLayerMouseEvent) => {
      const arc = findArc(e.features?.[0]?.id as string | number | undefined);
      if (!arc) return;
      latestRef.current.onClick?.({
        arc: arc as T,
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        originalEvent: e,
      });
    };

    map.on("mousemove", hitLayerId, handleMouseMove);
    map.on("mouseleave", hitLayerId, handleMouseLeave);
    map.on("click", hitLayerId, handleClick);

    return () => {
      map.off("mousemove", hitLayerId, handleMouseMove);
      map.off("mouseleave", hitLayerId, handleMouseLeave);
      map.off("click", hitLayerId, handleClick);
      setHover(null);
      map.getCanvas().style.cursor = "";
    };
  }, [isLoaded, map, hitLayerId, sourceId, interactive]);

  return null;
}
