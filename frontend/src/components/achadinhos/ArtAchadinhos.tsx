// Importe os componentes do arquivo onde você colou o código acima
import "./cssart.css";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

import Mouse from "@/assets/images/Mous.png";
import Garrafa from "@/assets/images/Garr.png";
import Teclado from "@/assets/images/tec.png";
import Whatch from "@/assets/images/Rel.png";
import Charge from "@/assets/images/carr.png";
import Dep from "@/assets/images/Dep.png";

export default function ArtAchadinhos() {
  return (
    <CardContainer>
      <CardBody className="Cardbody relative w-full mt-12 ">
        <CardItem
          as="p"
          target="__blank"
          translateZ="50"
          className="text-neutral-500 text-sm w-60 dark:text-neutral-300"
        >
          <CardItem
            translateZ={60}
            as="a"
            target="__blank"
            className="px-4 mt-5 py-2 rounded-xl text-xs font-normal dark:text-white
            duration-400
    hover:-scale-[-1.2]"
          >
            <img
              src={Garrafa}
              className="w-20 ml-20 mt-5  object-cover rounded-xl group-hover/
              duration-400
    hover:-scale-[-1.1]"
            />
            <img
              src={Teclado}
              className="w-90 h-30   object-cover rounded-xl group-hover/card:shadow-xl
              duration-400
    hover:-scale-[-1.1]"
            />
          </CardItem>
        </CardItem>
        <CardItem translateZ="40" target="__blank" className="w-full  ">
          <img
            src={Charge}
            className="w-25  object-cover rounded-xl group-hover/
            duration-400
    hover:-scale-[-1.1]"
          />
          <img
            src={Mouse}
            className="h-30 ml-6 mt-30 object-cover rounded-xl group-hover/
            duration-400
    hover:-scale-[-1.2]"
          />
        </CardItem>
        <CardItem translateZ={60} as="a" target="__blank" className="w-full">
          <img
            src={Whatch}
            className="h-30 ml-20 object-cover rounded-xl group-hover/
            duration-400
    hover:-scale-[-1.2]"
          />
          <img
            src={Dep}
            className="h-30 m-2 mt-10 object-cover rounded-xl group-hover/
            duration-400
    hover:-scale-[-1.1]"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
