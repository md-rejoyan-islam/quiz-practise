import PropTypes from "prop-types";

export default function Field({ label, id, children }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
