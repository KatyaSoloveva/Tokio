const TaskDetail = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.text}</p>
    </div>
  );
};

export default TaskDetail;
