import PropTypes from "prop-types";

export default function UserBanner({ name }) {
  return (
    <div className="text-center py-12 bg-sky-50 ">
      <img
        src="/assets/avater.webp"
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
      />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2
        className="text-4xl font-bold text-gray-700"
        style={{ fontFamily: "Jaro" }}
      >
        {name}
      </h2>
    </div>
  );
}

UserBanner.propTypes = {
  name: PropTypes.string.isRequired,
};
