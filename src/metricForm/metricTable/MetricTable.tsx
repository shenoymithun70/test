import { useMemo } from "react";
import { useForm, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import styles from "./MetricTable.module.scss";
import { AiOutlineDelete as DeleteIcon } from "react-icons/ai";

const MetricTable = ({ fields }) => {
  const { mutators } = useForm();
  // console.log("state", getState().values);
  // const componentListState = useMemo(() => {
  //   return getState().values["componentList"] ?? [];
  // }, [getState().values]);

  // console.log(
  //   "componentList State",
  //   componentListState,
  //   getState().values["componentList"]
  // );

  console.log(fields);

  return (
    <div className={styles.tableOuterContainer}>
      {fields && fields.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Component Name</th>
              <th>Time Taken</th>
              <th>No of Components</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields && fields.length > 0 ? fields.map((name, index) => {
              console.log("fields", name, fields)
              return (
                <tr key={`${name}`}>
                  <td>
                    <Field
                      name={`${name}.componentName`}
                      // component="input"
                      type="text"
                    >
                      {(props) => {
                        return <>{props.input.value}</>;
                      }}
                    </Field>
                  </td>
                  <td>
                    <Field
                      name={`${name}.timeTaken`}
                      // component="input"
                      type="text"
                    >
                      {(props) => {
                        return <>{props.input.value}</>;
                      }}
                    </Field>
                  </td>
                  <td>
                    <Field
                      name={`${name}.totalComponents`}
                      // component="input"
                      type="text"
                    >
                      {(props) => {
                        return <>{props.input.value}</>;
                      }}
                    </Field>
                  </td>

                  {/* <td className={styles.deleteColumn}>
                    <div
                      className={styles.deleteButton}
                      onClick={() => {
                        mutators.remove("componentList", index);
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </td> */}
                </tr>
              );
            }) : null}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default MetricTable;
