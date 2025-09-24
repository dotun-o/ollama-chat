import "./Row.css";

interface Props extends React.PropsWithChildren {
  alignment: "start" | "center" | "end";
  extraClasses?: string[];
}

function Row({ children, alignment, extraClasses = [] }: Props) {
  return (
    <div className={ `row ${alignment} ${extraClasses.join(" ")}` }>
      {children}
    </div>
  );
}

export default Row;
