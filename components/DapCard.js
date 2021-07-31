import Image from "next/image";
import svgHandshake from "../assets/svgHandshake.svg";

const DapCard = ({ title }) => {
  return (
    <div class="p-10 flex justify-center">
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <Image src={svgHandshake} alt="featured_dap" objectFit="cover" />
        <div class="px-6 py-4 text-center">
          <div class="font-bold text-xl mb-2">{title}</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DapCard;
