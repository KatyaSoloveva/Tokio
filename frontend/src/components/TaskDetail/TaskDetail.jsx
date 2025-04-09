const TaskDetail = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.text}</p>
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
    </div>
  );
};

export default TaskDetail;
