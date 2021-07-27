import "../styles/card.css";
import coverPic from "../assets/cover.png";
import { useSelector } from "react-redux";

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
  const coveredIndecies = useSelector((state) => state.card.coveredNumbers);

  const contents = [];

  for (let i = 0; i < 27; i++) {
    if (coveredIndecies.find((n) => i === n) === undefined) {
      contents.push(nums[i]);
    } else {
      contents.push(
        <img className="cover" src={coverPic} alt={""} />
        // "CO"
      );
    }
  }

  return (
    <div className="mb-2">
      <div className="list-group">
        <table
          key={card_id.toString()}
          className="table table-bordered card-table"
        >
          <tbody>
            <tr>
              <th className="text-center" rowSpan="3">
                Card #{card_id.toString()}
              </th>
              <td className="text-center">{contents[0]}</td>
              <td className="text-center">{contents[3]}</td>
              <td className="text-center">{contents[6]}</td>
              <td className="text-center">{contents[9]}</td>
              <td className="text-center">{contents[12]}</td>
              <td className="text-center">{contents[15]}</td>
              <td className="text-center">{contents[18]}</td>
              <td className="text-center">{contents[21]}</td>
              <td className="text-center">{contents[24]}</td>
            </tr>
            <tr>
              <td className="text-center">{contents[1]}</td>
              <td className="text-center">{contents[4]}</td>
              <td className="text-center">{contents[7]}</td>
              <td className="text-center">{contents[10]}</td>
              <td className="text-center">{contents[13]}</td>
              <td className="text-center">{contents[16]}</td>
              <td className="text-center">{contents[19]}</td>
              <td className="text-center">{contents[22]}</td>
              <td className="text-center">{contents[25]}</td>
            </tr>
            <tr>
              <td className="text-center">{contents[2]}</td>
              <td className="text-center">{contents[5]}</td>
              <td className="text-center">{contents[8]}</td>
              <td className="text-center">{contents[11]}</td>
              <td className="text-center">{contents[14]}</td>
              <td className="text-center">{contents[17]}</td>
              <td className="text-center">{contents[20]}</td>
              <td className="text-center">{contents[23]}</td>
              <td className="text-center">{contents[26]}</td>
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
