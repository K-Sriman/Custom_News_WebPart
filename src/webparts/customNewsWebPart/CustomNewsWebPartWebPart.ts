import * as React from 'react';
import * as ReactDom from 'react-dom';
import { sp } from '@pnp/sp';
import { BaseClientSideWebPart} from '@microsoft/sp-webpart-base';

import CustomNewsWebPart from './components/CustomNewsWebPart';

import {IPropertyPaneConfiguration,PropertyPaneToggle} from '@microsoft/sp-property-pane'; 
export interface ICustomNewsWebPartWebPartProps {
  showUncategorized: boolean;
}
export default class CustomNewsWebPartWebPart extends BaseClientSideWebPart<ICustomNewsWebPartWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICustomNewsWebPartWebPartProps> = React.createElement(
      CustomNewsWebPart,
      {
        showUncategorized: this.properties.showUncategorized
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  
  public onInit(): Promise<void> {
    sp.setup({ spfxContext: this.context });
    return super.onInit();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Toggle the view of Uncategorized page categories." },
          groups: [
            {
              groupName: "Display Settings",
              groupFields: [
                PropertyPaneToggle('showUncategorized', {
                  label: "Show Uncategorized Pages",
                  onText: "Shown",
                  offText: "Hidden"
                })
              ]
            }
          ]
        }
      ]
    };
  }  
}
