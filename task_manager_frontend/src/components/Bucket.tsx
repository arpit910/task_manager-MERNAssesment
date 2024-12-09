const Bucket = ({
  color = "gray",
  title = "Default Title",
  priorityIndex = 0,
}) => {
  return (
    <div
      className={`border-2 rounded-lg p-4 m-2 bg-white shadow-md text-center`}
      style={{ borderColor: color }}
    >
      <div className={`font-bold text-lg mb-2`} style={{ color }}>
        {title}
      </div>
      <div className="text-gray-600 text-sm">
        Priority Index: {priorityIndex}
      </div>
    </div>
  );
};

export default Bucket;
