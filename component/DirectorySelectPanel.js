import { View, Text } from "react-native";
import { React, useState } from "react";
[];
const dummyData = [
  {
    name: "메인",
    nesting: [
      {
        name: "뉴스",
        nesting: [
          { name: "IT", nesting: [] },
          { name: "경제", nesting: [] },
        ],
        link: [],
      },
      {
        name: "업무",
        nesting: [{ name: "회의", nesting: [] }],
        link: [
          { title: "회의 그거.. 어떻게 잘하는 건데?" },
          { title: "직원 회의를 효율적으로 주도하는 팁" },
        ],
      },
    ],
    link: [],
  },
];

const DirectorySelectPanel = ({ directory, setType, setDirectory }) => {
  const [current, setCurrent] = useState("/메인"); // current location
  const [currentDirectory, setCurrentDirectory] = useState(directory);

  return (
    <View>
      <View></View>
      <Text>DirectorySelectPanel</Text>
    </View>
  );
};

export default DirectorySelectPanel;
