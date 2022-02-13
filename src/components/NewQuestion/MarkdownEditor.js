import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({ body, edit }) => {
  return <MDEditor value={body} onChange={edit} />;
};

export default MarkdownEditor;
