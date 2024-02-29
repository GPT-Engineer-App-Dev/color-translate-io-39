import React, { useState } from "react";
import { Box, Container, Input, Button, SimpleGrid, Text, useToast, Image } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [hexColor, setHexColor] = useState("");
  const [colorInfo, setColorInfo] = useState(null);
  const toast = useToast();

  const handleSearch = async () => {
    if (!/^([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
      toast({
        title: "Invalid Hex Color",
        description: "Please enter a valid hex color code without the # symbol.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`https://api.color.pizza/v1/${hexColor}`);
      if (!response.ok) throw new Error("Color not found");
      const data = await response.json();
      setColorInfo(data.colors[0]);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py="8">
      <Box display="flex" mb="4">
        <Input placeholder="Enter hex color code without #" value={hexColor} onChange={(e) => setHexColor(e.target.value)} />
        <Button leftIcon={<FaSearch />} ml="2" colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {colorInfo && (
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <Text fontWeight="bold">Color Information:</Text>
            <Text>Name: {colorInfo.name}</Text>
            <Text>Hex: #{colorInfo.hex}</Text>
            <Text>
              RGB: rgb({colorInfo.rgb.r}, {colorInfo.rgb.g}, {colorInfo.rgb.b})
            </Text>
          </Box>
          <Box>
            <Image src={colorInfo.swatchImg.svg} alt={`Swatch of ${colorInfo.name}`} />
          </Box>
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Index;
