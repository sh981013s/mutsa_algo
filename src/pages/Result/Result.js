import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Result = () => {
  const codeString = 'print(123)';
  return (
    <SyntaxHighlighter language="python" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default Result;
