import OutlinedInput from "../formFields/OutlinedInput/OutlineInput";
import { requiredValidation } from "../utils/utilities";
import styles from "./MetricForm.module.scss";
import { Form, Field } from "react-final-form";
import Select from "react-select";
import MetricTable from "./metricTable/MetricTable";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

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

  const clearFields = (change) => {
    // Clear the values of specific fields
    change("componentName", "");
    change("timeTaken", "");
    change("totalComponents", "");
    // Add more field names as needed
  };

  const validateOtherFields = (values) => {
    const errors = {} as any;

    if (!values.componentName) {
      errors.componentName = "Component Name is required";
    }

    if (!values.timeTaken) {
      errors.timeTaken = "Time taken is required";
    }

    if (!values.totalComponents) {
      errors.totalComponents = "Total Compoenents is required";
    }

    return errors;
  };

  const validateField = (value, label) => {
    if (!value) {
      return `Required ${label}`;
    }
  };

  const printErrors = (errors) => {
    console.log(errors);
    return null;
  };

  return (
    <div className={styles.formContainer}>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={{
          name: "",
          emailId: "",
          lmEmailId: "",
          projectName: "",
          componentList: [],
        }}
        validate={(values) => {
          let errors = {} as any;
          if (!values.componentList || !values.componentList.length) {
            errors.componentList = `* Required at least 1 component list`;
          }
          return errors;
        }}
        render={({
          handleSubmit,
          values,
          form: {
            change,
            mutators: { push, pop },
          },
          pristine,
          hasValidationErrors,
        }) => {
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
                            maxLength={50}
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
                            maxLength={100}
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
                            maxLength={100}
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
                            maxLength={100}
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
                      // validate={(values) =>
                      //   validateField(values, "Component Name")
                      // }
                      //   validate={(values) =>
                      //     requiredValidation(values, "Component Name")
                      //   }
                    >
                      {(props) => {
                        {
                          console.log(
                            "component Name value",
                            props.input.value
                          );
                        }
                        return (
                          <>
                            <Select
                              {...props.input}
                              options={options}
                              value={
                                optionsObj[props.input.value]
                                  ? optionsObj[props.input.value]
                                  : null
                              }
                              onChange={(values) => {
                                props.input.onChange(values?.value);
                              }}
                              placeholder="Project Name"
                            />
                            {props.meta.error && props.meta.touched && (
                              <span>{props.meta.error}</span>
                            )}
                          </>
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>Time Taken</h3>
                    <Field
                      name="timeTaken"
                      // validate={(values) => validateField(values, "Time Taken")}
                    >
                      {(props) => {
                        return (
                          <>
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
                            {props.meta.error && props.meta.touched && (
                              <span>{props.meta.error}</span>
                            )}
                          </>
                        );
                      }}
                    </Field>
                  </div>

                  <div className={styles.formField}>
                    <h3 className={styles.label}>No of Components</h3>
                    <Field
                      name="totalComponents"
                      // validate={(values) =>
                      //   validateField(values, "No of Components")
                      // }
                    >
                      {(props) => {
                        return (
                          <>
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
                          </>
                        );
                      }}
                    </Field>
                  </div>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    type="reset"
                    disabled={
                      !values.componentName ||
                      !values.timeTaken ||
                      !values.totalComponents
                        ? true
                        : false
                    }
                    onClick={() => {
                      // onAdd(values, change);
                      const addErrors = validateOtherFields(values);
                      push("componentList", {
                        componentName: values.componentName,
                        timeTaken: values.timeTaken,
                        totalComponents: values.timeTaken,
                      });
                      clearFields(change);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  // disabled={pristine || hasValidationErrors}
                  type="submit"
                  onClick={() => {
                    // onAdd(values, change);
                    handleSubmit(values);
                  }}
                >
                  Submit
                </button>
                <Field name="componentList">
                  {(props) => {
                    return (
                      <>
                        {props.meta.error && props.meta.touched ? (
                          <span className={styles.errorMessage}>
                            {props.meta.error}
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Field>
              </div>

              <FieldArray name="componentList" component={MetricTable} />
            </form>
          );
        }}
      />
    </div>
  );
};

export default MetricForm;
