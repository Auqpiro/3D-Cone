function validate({ height, radius, segments }) {
  const errors = [];
  const blank = "unnecessary value";
  const bad = "bad format";

  if (!height) {
    errors.push({ source: 'height', title: blank });
  } else if (!height.toString().match(/^[0-9]*$/)) {
    errors.push({ source: 'height', title: bad });
  }

  if (!radius) {
    errors.push({ source: 'radius', title: blank });
  } else if (!radius.toString().match(/^[0-9]*$/)) {
    errors.push({ source: 'radius', title: bad });
  }

  if (!segments) {
    errors.push({ source: 'segments', title: blank });
  } else if (!segments.toString().match(/^[0-9]*$/)) {
    errors.push({ source: 'segments', title: bad });
  }

  return errors;
};

export default validate;