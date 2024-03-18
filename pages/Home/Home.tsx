import * as React from "react";
import { Box } from "@gluestack-ui/themed";
import CircleLogo from "../../components/logo/CircleLogo";

export default function HomePage() {
  return (
    <Box px={16} justifyContent="space-between" alignItems="center">
      <CircleLogo width={200} height={200} />
    </Box>
  );
}
