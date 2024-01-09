import React from 'react'
import "./ErrorStyles.css";
import {Text} from "@chakra-ui/react";
export default function Error() {
  return (
    <section class="page_404">
	<div class="container">
		<div class="row">	
		    <div class="col-sm-12 ">
		    <div class="col-sm-10 col-sm-offset-1  text-center">
		    <div class="four_zero_four_bg">
			    <Text fontSize={"2em"}  color={"white"} display={"flex"} bottom={"3em"} justifyContent={"center"} width={"100%"} position={"absolute"} >Something went wrong... </Text>
		    </div>
		    </div>
		    </div>
		</div>
	</div>
</section>
  )
}
