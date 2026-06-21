import { Map, MapArc } from "./Map";

const shippingArcs = [
  { id: "1", from: [-74.006, 40.7128] as [number, number], to: [-0.1278, 51.5074] as [number, number] }, // NYC to London
  { id: "2", from: [-74.006, 40.7128] as [number, number], to: [139.6917, 35.6895] as [number, number] }, // NYC to Tokyo
  { id: "3", from: [-0.1278, 51.5074] as [number, number], to: [55.2708, 25.2048] as [number, number] }, // London to Dubai
  { id: "4", from: [55.2708, 25.2048] as [number, number], to: [103.8198, 1.3521] as [number, number] }, // Dubai to Singapore
  { id: "5", from: [103.8198, 1.3521] as [number, number], to: [151.2093, -33.8688] as [number, number] }, // Singapore to Sydney
  { id: "6", from: [-122.4194, 37.7749] as [number, number], to: [139.6917, 35.6895] as [number, number] }, // SF to Tokyo
  { id: "7", from: [-74.006, 40.7128] as [number, number], to: [-46.6333, -23.5505] as [number, number] }, // NYC to Sao Paulo
  { id: "8", from: [13.405, 52.52] as [number, number], to: [28.0473, -26.2041] as [number, number] }, // Berlin to Johannesburg
];

export const GlobalReachMapSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12">
        <div className="text-center">
          <span className="px-3 py-1 text-xs border rounded-full border-outline text-on-surface-variant font-label-sm uppercase tracking-wider inline-block mb-4">
            Global Logistics
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            We Ship Everywhere. Fast.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Our enterprise supply chain network reaches across 150+ countries. Get your hardware where you need it, when you need it.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-outline relative shadow-2xl">
        <Map
          theme="light"
          viewport={{
            center: [10, 30],
            zoom: 1.5,
            pitch: 35,
            bearing: 0,
          }}
          interactive={false}
          className="bg-slate-50"
        >
          <MapArc
            data={shippingArcs}
            curvature={0.3}
            paint={{
              "line-color": "#c5a059",
              "line-width": 3,
              "line-opacity": 0.8,
            }}
            hoverPaint={{
              "line-width": 5,
              "line-color": "#1b1c1c",
            }}
          />
        </Map>
        
        {/* Overlay gradient to blend map edges into the page */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_40px_rgba(251,249,248,1)]"></div>
      </div>
    </section>
  );
};
