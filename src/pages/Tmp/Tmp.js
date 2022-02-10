import styled from 'styled-components';
import { Code } from '../Solve/Solve';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

const CodeEditor = styled(Code)`
  width: 50%;
  height: 50vh;
`;

const Output = styled.div`
  width: 50%;
  height: 50vh;
  background: #c7c797;
`;

const InputDiv = styled.div`
  width: 50%;
  height: 50vh;
  background: #a3c797;
`;

const Tmp = () => {
  const [code, setCode] = useState(
    `print('안녕하세요! 멋사에 지원해주셔서 감사드립니다.')`
  );
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [res, setRes] = useState('');

  const encode = (str) => {
    return btoa(unescape(encodeURIComponent(str || '')));
  };

  const decode = (str) => {
    return atob(str);
  };

  function errorHandler(jqXHR, textStatus, errorThrown) {
    setRes(`${JSON.stringify(jqXHR, null, 4)}`);
  }

  /*  function check(token) {
    setRes('⏬ Checking submission status...');
    $.ajax({
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
      type: 'GET',
      headers: {
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      success: function (data, textStatus, jqXHR) {
        if ([1, 2].includes(data['status']['id'])) {
          $('#output').val(
            $('#output').val() + '\nℹ️ Status: ' + data['status']['description']
          );
          setTimeout(function () {
            check(token);
          }, 1000);
        } else {
          var output = [decode(data['compile_output']), decode(data['stdout'])]
            .join('\n')
            .trim();
          $('#output').val(
            `${data['status']['id'] != '3' ? '🔴' : '🟢'} ${
              data['status']['description']
            }\n${output}`
          );
          $('#run').prop('disabled', false);
        }
      },
      error: errorHandler,
    });
  }*/

  const submitHandler = async () => {
    const response = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true',
      {
        method: 'POST',
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_JUDGE_KEY,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          language_id: 71,
          source_code: encode(code),
          stdin: encode(input),
          redirect_stderr_to_stdout: true,
          // expected_output: encode(output),
        }),
      }
    );
    /*    const response = await fetch(
      'https://ce.judge0.com/submissions/batch?base64_encoded=true',
      {
        method: 'POST',
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': API_KEY,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          submissions: [
            {
              language_id: 46,
              source_code: 'echo hello from Bash',
            },
            {
              language_id: 71,
              source_code: 'print("hello from Python")',
            },
            {
              language_id: 72,
              source_code: 'puts("hello from Ruby")',
            },
          ],
        }),
      }
    );*/
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.token) {
      let url = `https://judge0-ce.p.rapidapi.com/submissions/${responseJson.token}?base64_encoded=true`;
      const getSolution = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_JUDGE_KEY,
          'content-type': 'application/json',
        },
      });
      const final = await getSolution.json();
      console.log(final);
      /*    if (responseJson.token) {
      let url = `https://judge0-ce.p.rapidapi.com/submissions/batch${responseJson.token}?base64_encoded=true`;
      const getSolution = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': API_KEY,
          'content-type': 'application/json',
        },
      });
      const final = await getSolution.json();
      console.log(final);
    }*/
    }
  };

  return (
    <Container>
      <CodeEditor
        value={code}
        language="python"
        placeholder="파이썬 코드를 입력해주세요."
        onChange={(e) => setCode(e.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: '#131414',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <Output>{res}</Output>
      <InputDiv>
        <p>expected input</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
        <p>expected input</p>
        <textarea
          onChange={(e) => setOutput(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
        <button onClick={submitHandler}>run</button>
      </InputDiv>
    </Container>
  );
};

export default Tmp;
