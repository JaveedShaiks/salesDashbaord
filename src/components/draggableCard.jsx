import React from "react";
import Draggable from "react-draggable";

export const DraggableCard = ({ title, children }) => (
    <Draggable>
      <div>
            <h3>{title}</h3>
            {children}
      </div>
    </Draggable>
  );