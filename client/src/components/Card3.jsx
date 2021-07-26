import "../styles/card2.css"

function convert_num_array(place_num_array) {
  // init the nums array to empty string
  let nums = [];
  for (var i = 0; i < 27; i++) {
    nums.push("");
  }

  // fill the nums array based on place_num_array
  place_num_array.forEach((item, index, array) => {
    if (item[0] < 27) nums[item[0]] = String(item[1]);
  });

  return nums;
}

const Card = (props) => {
  const card_id = props.id;
  const nums = convert_num_array(props.number_placement);

  return (
    <div className="mycontainer">
      <div className="card-container">
        <div className="card-id">
          <span>Card #{card_id}</span>
        </div>
        <div className="card-number">
          {nums && nums.map((num, i) => {
            return (
              <div key={`card-${i}`} className="card-number-slot">
                {num}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  id: 12,
};

// You can use this to have dynamic styles. style={CardStyle}
// const CardStyle = {
//   color: "red",
//   backgroundColor: "black",
// };

export default Card;
