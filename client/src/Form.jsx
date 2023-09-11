import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import routes from './utils/routes';

function Form({ onLoad }) {
  const [errors, setErrors] = useState(null);
  const formik = useFormik({
    initialValues: {
      height: '',
      radius: '',
      segments: '',
    },
    onSubmit: (values, { resetForm }) => {
      axios.post(routes.cone(), values)
        .then(({ data }) => {
          setErrors(null);
          onLoad(data);
        })
        .catch(({ response }) => {
          formik.setSubmitting(false);
          setErrors(response.data.reduce((acc, { source, title }) => {
            acc[source] = title;
            return acc;
          }, {}));
        })
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset disabled={formik.isSubmitting}>
        <legend>cone parameters</legend>
        <label htmlFor="height">height
          <input
            required
            id="height"
            name="height"
            type="number"
            onBlur={formik.onBlur}
            onChange={formik.handleChange}
            value={formik.values.height}
          />
          {errors ? (
            <div>{errors.height}</div>
          ) : null}
        </label>
        <label htmlFor="radius">radius
          <input
            required
            id="radius"
            name="radius"
            type="number"
            onBlur={formik.onBlur}
            onChange={formik.handleChange}
            value={formik.values.radius}
          />
          {errors ? (
            <div>{errors.radius}</div>
          ) : null}
        </label>
        <label htmlFor="segments">number of segments
          <input
            required
            id="segments"
            name="segments"
            type="number"
            onBlur={formik.onBlur}
            onChange={formik.handleChange}
            value={formik.values.segments}
          />
          {errors ? (
            <div>{errors.segments}</div>
          ) : null}
        </label>
        <button type="submit">submit</button>
      </fieldset>
    </form>
  );
}

export default Form;