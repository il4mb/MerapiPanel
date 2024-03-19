import React from 'react';
import { render, screen } from '@testing-library/react';
import { RootEditor, Layout, LayoutRow, Canvas, Components } from "./editor";
const { Containers, Button, Panel, Breadcrumb } = Components;

describe('RootEditor', () => {
    test('renders RootEditor component', () => {

        render(<RootEditor>
            <Layout id='test-layout'>
                <Panel id='test-panel' >
                    <Button id='test-button' command="test-button-command"></Button>
                </Panel>

            </Layout>
            <LayoutRow>
                <Layout id='test-left-layout'>
                    <Containers.LayersContainer />
                </Layout>
                <Canvas>
                    Hallo World
                </Canvas>
                <Layout id='test-right-layout'>
                    <Containers.SelectedContainer />
                    <Containers.StylesContainer />
                </Layout>
            </LayoutRow>
            <Breadcrumb />
        </RootEditor>);

        expect(screen.getByText('Hallo World')).toBeInTheDocument();
    });
});
