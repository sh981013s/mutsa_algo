import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

const Solve = () => {
  const [code, setCode] = useState(
    `print('안녕하세요! 멋사에 지원해주셔서 감사드립니다.')`
  );
  useEffect(() => {
    console.log(code);
  }, [code]);
  return (
    <CodeEditor
      value={code}
      language="python"
      placeholder="Please enter JS code."
      onChange={(e) => setCode(e.target.value)}
      padding={15}
      style={{
        fontSize: 12,
        backgroundColor: '#f5f5f5',
        fontFamily:
          'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
};

export default Solve;
