import { useSelector } from "react-redux";
import CardColumn from "./Card/CardColumn";

function convert_num_array(place_num_array) {
  if (!place_num_array) {
    return [
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ];
  }
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

function isCovered(index, coveredIndecies) {
  let covered = coveredIndecies.find((n) => index === n) || false;
  if (covered !== false) {
    covered = true;
  }
  return covered;
}

const Card4 = (props) => {
  const { id } = props;
  const nums = convert_num_array(props.nums);
  const coveredIndecies = useSelector((state) => state.card.coveredNumbers);

  let cols = [];

  for (let i = 0; i < nums.length / 3; i++) {
    const col = [];
    col.push([3 * i, nums[3 * i], isCovered(3 * i, coveredIndecies)]);
    col.push([
      3 * i + 1,
      nums[3 * i + 1],
      isCovered(3 * i + 1, coveredIndecies),
    ]);
    col.push([
      3 * i + 2,
      nums[3 * i + 2],
      isCovered(3 * i + 2, coveredIndecies),
    ]);
    cols.push(col);
  }

  return (
    <div>
      <div className="card">
        <div>
          <div>{"Card #" + id}</div>
        </div>
        <div>
          {cols.map((col, i) => {
            return <CardColumn key={i} colInfo={col} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Card4;
