import React from "react";
import { Segment, Container } from "semantic-ui-react";

interface ContentContainerProps {
    children: any;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }: ContentContainerProps) => (
    <Container style={{ paddingTop: "2rem", width: "40%" }}>
        <Segment raised padded>
            {children}
        </Segment>
    </Container>
);

export default ContentContainer;
