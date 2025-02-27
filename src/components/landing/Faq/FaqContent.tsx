import ReactMarkdown from "react-markdown";

export type FaqContentProps = {
  children: string;
};

export const FaqContent = ({ children }: FaqContentProps) => {
  return (
    <div className="prose w-full max-w-none bg-instillGrey05 p-5">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};
