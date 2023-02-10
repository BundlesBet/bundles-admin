import { Flex, Grid, Spinner } from "@chakra-ui/react";

const CustomLoader = () => {
  return (
    <Grid textAlign="center" mt={4}>
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Spinner />
      </Flex>
    </Grid>
  );
};

export default CustomLoader;
