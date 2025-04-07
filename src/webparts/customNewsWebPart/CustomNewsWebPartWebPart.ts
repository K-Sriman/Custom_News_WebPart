import * as React from 'react';
import * as ReactDom from 'react-dom';
import { sp } from '@pnp/sp';
import { BaseClientSideWebPart, 
  // WebPartContext 

} from '@microsoft/sp-webpart-base';

import CustomNewsWebPart from './components/CustomNewsWebPart';
import { ICustomNewsWebPartProps } from './components/ICustomNewsWebPartProps';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

export interface ICustomNewsWebPartWebPartProps {
  // ctx: WebPartContext;
}

export default class CustomNewsWebPartWebPart extends BaseClientSideWebPart<ICustomNewsWebPartWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICustomNewsWebPartProps> = React.createElement(
      CustomNewsWebPart,
      {
        // ctx: this.context  // Passing the WebPartContext as ctx
      }
    );

    ReactDom.render(element, this.domElement);
  }
  public onInit(): Promise<void> {
    sp.setup({ spfxContext: this.context });
    return super.onInit();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
