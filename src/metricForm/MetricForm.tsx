import OutlinedInput from "../formFields/OutlinedInput/OutlineInput";
import { requiredValidation } from "../utils/utilities";
import styles from "./MetricForm.module.scss";
import { Form, Field } from "react-final-form";
import Select from "react-select";
import MetricTable from "./metricTable/MetricTable";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { useEffect, useState } from "react";
import axios from 'axios'
import Modal from "../modal/Modal";

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

  const [componentNameOptions, setComponentNameOptions] = useState([]);
  const [componentNameOptionsObj, setComponentNameOptionsObj] = useState({});
  const [componentNameByIdObj, setComponentNameByIdObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productivityObj, setProductivityObj] = useState<{ componentProductivity: { componentName: string, productivity: number }[], avgProductivity: number, projectName: string }>(null);
  const [error, setError] = useState(false);


  useEffect(() => {
    (async () => {
      const options = await axios.get('http://localhost:8000/performancemetrics/standardmetrics').then((res) => res.data);
      if (options) {
        // setComponentNameOptions(o)
        const allOptions = options.reduce((prev, curVal) => {
          const formattedValue = {
            value: curVal.componentName,
            label: curVal.componentName,
          }
          prev['optionsArr'].push(formattedValue);
          prev['optionsObj'][curVal?.componentName] = formattedValue;
          prev['optionsById'][curVal?.id] = curVal?.componentName;
          return prev;
        }, { optionsArr: [], optionsObj: {}, optionsById: {} });
        setComponentNameOptions(allOptions?.optionsArr);
        setComponentNameOptionsObj(allOptions?.optionsObj)
        setComponentNameByIdObj(allOptions?.optionsById);
        console.log(allOptions)
      }
    })()
  }, [])


  const setProductivity = (productivityObj) => {
    setProductivityObj(productivityObj);
  }

  const onSubmit = async (values: any) => {
    console.log(values);
    // setError(true)
    try {
      const data = await axios.post('http://localhost:8000/performancemetrics', values).then((res) => res.data);
      if (data) {
        const componentProductivity = data?.componentList.map((item) => {
          return {
            componentName: componentNameByIdObj[item.componentId],
            productivity: item.productivity,
          }
        });
        const finalProductivity = { componentProductivity: componentProductivity, avgProductivity: data?.avgProductivity, projectName: data?.projectName };

        setIsModalOpen(true);
        console.log("componentProductivity", finalProductivity)
        setProductivity(finalProductivity)
      }
      // return data;
    } catch (error) {
      console.log(error);
      setError(true);
    }

    return {
      name: "",
      emailId: "",
      lmEmailId: "",
      projectName: "",
      componentList: [],
    }
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
    <>
      <div className={styles.formContainer}>
        <Form
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
          // initialValues={{
          //   name: "",
          //   emailId: "",
          //   lmEmailId: "",
          //   projectName: "",
          //   componentList: [],
          // }}
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
              reset
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
                          // {
                          //   console.log(
                          //     "component Name value",
                          //     props.input.value
                          //   );
                          // }
                          return (
                            <>
                              <Select
                                {...props.input}
                                options={componentNameOptions}
                                value={
                                  componentNameOptionsObj[props.input.value]
                                    ? componentNameOptionsObj[props.input.value]
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
                          totalComponents: values.totalComponents,
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

                <FieldArray name="componentList">
                  {({ fields }) => {
                    return <MetricTable fields={fields} />
                  }}
                </FieldArray>
              </form>
            );
          }}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => {
        // onclose function
        setProductivityObj(null)
      }}>
        {error ? <div>Something went wrong</div> :
          productivityObj ? <>
            {productivityObj.componentProductivity.map((item) => {
              return <div>{`${item.componentName} Productivity : ${item.productivity}`}</div>
            })}
            <div>
              {`Average Productivity of ${productivityObj?.projectName}: ${productivityObj.avgProductivity}`}
            </div>
          </> : null
        }
      </Modal>
    </>


  );
};

export default MetricForm;
