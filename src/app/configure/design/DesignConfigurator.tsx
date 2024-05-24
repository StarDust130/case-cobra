import NextImage from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface DesignConfigProps {
  configId: string;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
}

const DesignConfigurator = ({
  imageUrl,
  imageDimensions,
  configId,
}: DesignConfigProps) => {
  return (
    <>
      <div className="relative mt-20 grid grid-col-3 mb-20 pb-20">
        <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
            <AspectRatio
              ratio={896 / 1831}
              className="pointer-events-none relative z-50 aspect-[896/1831] w-full "
            >
              <NextImage
                src="/phone-template.png"
                alt="phone image"
                fill
                className="pointer-events-none dark:brightness-200  z-50  select-none"
              />
            </AspectRatio>
            {/* Highlight phone over it Background */}
            <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgb(229,231,235,0.6)]" />

            <div
              className={cn(
                "absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
                `bg-blue-950`
              )}
            />
          </div>

          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              alt={"your Image"}
              className="pointer-events-none dark:brightness-200  z-50  select-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DesignConfigurator;