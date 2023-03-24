import UploadProgress from "./UploadProgress";

const UploadProgressCont: React.FC<{ files: any; upload: any }> = function (
  props
) {
  return (
    <div>
      {props.files.map((item: any, index: number) => (
        <UploadProgress
          name={item.name}
          type={item.type}
          upload={props.upload[index]}
          key={index}
        />
      ))}
    </div>
  );
};

export default UploadProgressCont;
