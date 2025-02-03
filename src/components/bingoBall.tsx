// src/components/BingoBall.tsx
type BingoBallProps = {
  number: number;
  column: string;
};

export const BingoBall = ({ number, column }: BingoBallProps) => {
  return (
    <div className="group relative mx-auto w-[120px] md:w-[140px]">
      {/* Bola principal */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 p-2 shadow-xl transition-transform duration-300 group-hover:scale-105">
        
        {/* Letra da coluna */}
        <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 transform md:-top-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 shadow-md md:h-10 md:w-10">
            <span className="text-lg font-bold text-red-600 md:text-xl">
              {column}
            </span>
          </div>
        </div>

        {/* Número central */}
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white md:h-[90px] md:w-[90px]">
          <span className="text-3xl font-bold text-red-600 md:text-4xl">
            {number}
          </span>
        </div>
      </div>
    </div>
  );
};