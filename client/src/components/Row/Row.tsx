import "./Row.css";

interface Props extends React.PropsWithChildren {
  alignment: "start" | "center" | "end";
}

function Row({ children, alignment }: Props) {
  return (
    <div className={ `row ${alignment}` }>
      {children}
    </div>
  );
}

export default Row;
