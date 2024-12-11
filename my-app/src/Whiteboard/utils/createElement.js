import { toolTypes } from "../../constants";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const generateRectangle = ({ x1, y1, x2, y2 }) => {
  return generator.rectangle(x1, y1, x2 - x1, y2 - y1);
};

const generateLine = ({ x1, y1, x2, y2 }) => {
  return generator.line(x1, y1, x2, y2);
};

export const createElement = ({ x1, y1, x2, y2, toolType, id, text, src }) => {
  let roughElement;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughElement = generateRectangle({ x1, y1, x2, y2 });
      return {
        id: id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };
    case toolTypes.LINE:
      roughElement = generateLine({ x1, x2, y1, y2 });
      return {
        id: id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };
    case toolTypes.PENCIL:
      return {
        id,
        type: toolType,
        points: [{ x: x1, y: y1 }],
      };

    case toolTypes.IMAGE:

      const img = new Image();
      img.src = src;
      return { id, type: toolType,img, src, x1, y1, x2, y2 }; // Temporary element
    case toolTypes.TEXT:
      return { id, type: toolType, x1, y1, x2, y2, text: text || "" };
    default:
      throw new Error("Something went wrong when creating element");
  }
};
