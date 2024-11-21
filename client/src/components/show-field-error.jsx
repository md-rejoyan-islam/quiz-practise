import PropTypes from "prop-types";
export default function ShowFieldError({ errors, name }) {
  return (
    <>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </>
  );
}

ShowFieldError.propTypes = {
  errors: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
