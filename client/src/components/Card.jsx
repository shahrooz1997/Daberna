import "../styles/card.css";

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
    <div className="mb-2">
      <div className="list-group">
        <table key={card_id.toString()} className="table table-bordered card-table">
          <tbody>
            <tr>
              <th className="text-center" rowSpan="3">
                Card #{card_id.toString()}
              </th>
              <td className="text-center">{nums[0]}</td>
              <td className="text-center">{nums[3]}</td>
              <td className="text-center">{nums[6]}</td>
              <td className="text-center">{nums[9]}</td>
              <td className="text-center">{nums[12]}</td>
              <td className="text-center">{nums[15]}</td>
              <td className="text-center">{nums[18]}</td>
              <td className="text-center">{nums[21]}</td>
              <td className="text-center">{nums[24]}</td>
            </tr>
            <tr>
              <td className="text-center">{nums[1]}</td>
              <td className="text-center">{nums[4]}</td>
              <td className="text-center">{nums[7]}</td>
              <td className="text-center">{nums[10]}</td>
              <td className="text-center">{nums[13]}</td>
              <td className="text-center">{nums[16]}</td>
              <td className="text-center">{nums[19]}</td>
              <td className="text-center">{nums[22]}</td>
              <td className="text-center">{nums[25]}</td>
            </tr>
            <tr>
              <td className="text-center">{nums[2]}</td>
              <td className="text-center">{nums[5]}</td>
              <td className="text-center">{nums[8]}</td>
              <td className="text-center">{nums[11]}</td>
              <td className="text-center">{nums[14]}</td>
              <td className="text-center">{nums[17]}</td>
              <td className="text-center">{nums[20]}</td>
              <td className="text-center">{nums[23]}</td>
              <td className="text-center">{nums[26]}</td>
            </tr>
          </tbody>
        </table>
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
