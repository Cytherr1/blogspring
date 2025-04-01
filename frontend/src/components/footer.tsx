"use client";
import {
  Paper,
  Stack,
  Text,
} from "@mantine/core";

export default function Footer() {
  return (
    <footer>
      <Paper withBorder component={Stack} radius="none" p="md" w="100%" h="75px" align="center" justify="center">
	  	<Text size="xs">All rights reserved. 2025 © | BlogSpring </Text>
      </Paper>
    </footer>
  );
}
