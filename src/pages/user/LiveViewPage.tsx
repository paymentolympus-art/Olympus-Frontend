import { PageContainer } from "@/components/widgets/PageContainer";
import { ContainerGlobe } from "@/components/features/live-view/ContainerGlobe";
import { ContainerAnalytic } from "@/components/features/live-view/ContainerAnalytic";

export function LiveViewPage() {
  return (
    <PageContainer title="Live View" className="py-5">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-lg font-semibold">Análise de acessos</h1>

        <div
          className="flex flex-row items-center gap-2 border rounded-sm px-2 py-0.5"
          style={{
            borderColor: "rgba(248, 0, 157, 0.5)",
            background: "rgba(248, 0, 157, 0.2)",
          }}
        >
          <p className="text-xs text-zinc-300">ao vivo</p>
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse duration-300 ease-in-out"
            style={{ backgroundColor: "#F8009D" }}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row sm:gap-10 w-full h-full">
        {/* Lista de Coordenadas */}
        <ContainerAnalytic />
        {/* Globo 3D */}
        <ContainerGlobe />
      </div>
    </PageContainer>
  );
}
