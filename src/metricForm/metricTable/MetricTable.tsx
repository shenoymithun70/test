import { useMemo } from "react";
import { useForm } from "react-final-form";

const MetricTable = () => {
  const { getState } = useForm();
  console.log("state", getState().values);
  const componentListState = useMemo(() => {
    return getState().values["componentList"] ?? [];
  }, [getState().values]);

  console.log(
    "componentList State",
    componentListState,
    getState().values["componentList"]
  );

  return (
    <>
      {componentListState.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Component Name</th>
              <th>Time Taken</th>
              <th>No of Components</th>
            </tr>
          </thead>
          <tbody>
            {getState().values["componentList"].map((item) => {
              return (
                <tr>
                  <td>{item?.componentName}</td>
                  <td>{item?.timeTaken}</td>
                  <td>{item?.totalComponents}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default MetricTable;
