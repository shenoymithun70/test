import OutlinedInput from "../formFields/OutlinedInput/OutlineInput";
import { requiredValidation } from "../utils/utilities";
import styles from "./MetricForm.module.scss";
import { Form, Field } from "react-final-form";
import Select from "react-select";
import MetricTable from "./metricTable/MetricTable";

const options = [
  { value: "Filters", label: "Filters" },
  { value: "Jobs", label: "Jobs" },
  { value: "JobFlows", label: "JobFlows" },
  { value: "UDP", label: "UDP" },
];

const optionsObj = options.reduce((prev, curVal) => {
  prev[curVal.value] = curVal;
  return prev;
}, {});

const MetricForm = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const onAdd = (values, formChangeFunc) => {
    console.log("on Add", values);
    const { componentName, timeTaken, totalComponents } = values;
    const existingValues = values?.componentList ?? [];
    existingValues.push({
      componentName,
      timeTaken,
      totalComponents,
    });
    formChangeFunc("componentList", existingValues);
    // const {projectName , totalComponents , } = values;
  };

  return (
    <div className={styles.formContainer}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form: { change } }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.innerContainer}>
                <div className={styles.leftContainer}>
                  <div className={styles.formField}>
                    <h3 className={styles.label}>Name</h3>
                    <Field
                      name="name"
                      validate={(values) => requiredValidation(values, "name")}
                    >
                      {(props) => {
                        return (
                          <OutlinedInput
                            {...props.input}
                            maxLength={15}
                            error={
                              props.meta.error && props.meta.touched
                                ? props.meta.error
                                : props.meta.submitError
                                ? props.meta.submitError
                                : null
                            }
                            value={props.input.value}
                            onChange={props.input.onChange}
                            placeholder="Name"
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>Email Id</h3>
                    <Field
                      name="emailId"
                      validate={(values) =>
                        requiredValidation(values, "emailId")
                      }
                    >
                      {(props) => {
                        return (
                          <OutlinedInput
                            {...props.input}
                            maxLength={15}
                            error={
                              props.meta.error && props.meta.touched
                                ? props.meta.error
                                : props.meta.submitError
                                ? props.meta.submitError
                                : null
                            }
                            value={props.input.value}
                            onChange={props.input.onChange}
                            placeholder="emailId"
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>LM Email Id</h3>
                    <Field
                      name="lmEmailId"
                      validate={(values) =>
                        requiredValidation(values, "LM Email ID")
                      }
                    >
                      {(props) => {
                        return (
                          <OutlinedInput
                            {...props.input}
                            maxLength={15}
                            error={
                              props.meta.error && props.meta.touched
                                ? props.meta.error
                                : props.meta.submitError
                                ? props.meta.submitError
                                : null
                            }
                            value={props.input.value}
                            onChange={props.input.onChange}
                            placeholder="lmEmailId"
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>Project Name</h3>
                    <Field
                      name="projectName"
                      validate={(values) =>
                        requiredValidation(values, "Project Name")
                      }
                    >
                      {(props) => {
                        return (
                          <OutlinedInput
                            {...props.input}
                            maxLength={15}
                            error={
                              props.meta.error && props.meta.touched
                                ? props.meta.error
                                : props.meta.submitError
                                ? props.meta.submitError
                                : null
                            }
                            value={props.input.value}
                            onChange={props.input.onChange}
                            placeholder="Project Name"
                          />
                        );
                      }}
                    </Field>
                  </div>
                </div>

                <div className={styles.rightContainer}>
                  <div className={styles.formField}>
                    <h3 className={styles.label}>Component Name</h3>
                    <Field
                      name="componentName"
                      //   validate={(values) =>
                      //     requiredValidation(values, "Component Name")
                      //   }
                    >
                      {(props) => {
                        return (
                          <Select
                            {...props.input}
                            options={options}
                            value={optionsObj[props.input.value]}
                            onChange={(values) => {
                              props.input.onChange(values?.value);
                            }}
                            placeholder="Project Name"
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>Time Taken</h3>
                    <Field name="timeTaken">
                      {(props) => {
                        return (
                          <OutlinedInput
                            {...props.input}
                            type="number"
                            maxLength={15}
                            error={
                              props.meta.error && props.meta.touched
                                ? props.meta.error
                                : props.meta.submitError
                                ? props.meta.submitError
                                : null
                            }
                            value={props.input.value}
                            onChange={props.input.onChange}
                            placeholder="Time Taken"
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>No of Components</h3>
                    <Field name="totalComponents">
                      {(props) => {
                        return (
                          <OutlinedInput
                            {...props.input}
                            type="number"
                            maxLength={15}
                            error={
                              props.meta.error && props.meta.touched
                                ? props.meta.error
                                : props.meta.submitError
                                ? props.meta.submitError
                                : null
                            }
                            value={props.input.value}
                            onChange={props.input.onChange}
                            placeholder="No Of Components"
                          />
                        );
                      }}
                    </Field>
                  </div>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    type="reset"
                    onClick={() => {
                      onAdd(values, change);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              <MetricTable />
            </form>
          );
        }}
      />
    </div>
  );
};

export default MetricForm;
