import React from 'react'
import {Container, Divider, Grid, Header, Image, List, Segment} from 'semantic-ui-react'
import {BrowserRouter as Router} from "react-router-dom";

const Home = () => (
  <>
      <Container text>
          <Header as='h1'>Semantic UI React Fixed Template</Header>
          <p>This is a basic fixed menu template using fixed size containers.</p>
          <p>
              A text container is used for the main container, which is useful for single column layouts.
          </p>

          <Image src='/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
          <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <Container textAlign='center'>
              <Grid divided inverted stackable>
                  <Grid.Column width={3}>
                      <Header inverted as='h4' content='Group 1' />
                      <List link inverted>
                          <List.Item as='a'>Link One</List.Item>
                          <List.Item as='a'>Link Two</List.Item>
                          <List.Item as='a'>Link Three</List.Item>
                          <List.Item as='a'>Link Four</List.Item>
                      </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                      <Header inverted as='h4' content='Group 2' />
                      <List link inverted>
                          <List.Item as='a'>Link One</List.Item>
                          <List.Item as='a'>Link Two</List.Item>
                          <List.Item as='a'>Link Three</List.Item>
                          <List.Item as='a'>Link Four</List.Item>
                      </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                      <Header inverted as='h4' content='Group 3' />
                      <List link inverted>
                          <List.Item as='a'>Link One</List.Item>
                          <List.Item as='a'>Link Two</List.Item>
                          <List.Item as='a'>Link Three</List.Item>
                          <List.Item as='a'>Link Four</List.Item>
                      </List>
                  </Grid.Column>
                  <Grid.Column width={7}>
                      <Header inverted as='h4' content='Footer Header' />
                      <p>
                          Extra space for a call to action inside the footer that could help re-engage users.
                      </p>
                  </Grid.Column>
              </Grid>

              <Divider inverted section />
              <Image centered size='mini' src='/images/wireframe/logo.png' />
              <List horizontal inverted divided link size='small'>
                  <List.Item as='a' href='#'>
                      Site Map
                  </List.Item>
                  <List.Item as='a' href='#'>
                      Contact Us
                  </List.Item>
                  <List.Item as='a' href='#'>
                      Terms and Conditions
                  </List.Item>
                  <List.Item as='a' href='#'>
                      Privacy Policy
                  </List.Item>
              </List>
          </Container>
      </Segment>
  </>
)

export default Home