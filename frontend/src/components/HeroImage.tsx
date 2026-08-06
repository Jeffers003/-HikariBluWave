// Importe os componentes do arquivo onde você colou o código acima
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import imageHeadset from "@/assets/images/HeadsetImage.png";
export default function CardTD() {
  return (
    <CardContainer>
      <CardBody className=" relative group/card    sm:w-[30rem] rounded-xl p-6 ">
        <CardItem translateZ="40" className="w-full">
          <img
            src={imageHeadset}
            className="h-90   object-cover rounded-xl group-hover/"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
