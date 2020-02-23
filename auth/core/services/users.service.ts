import { IDataSourceService, ISource, ISourceRequestQueryParameters } from '../../../components/ng-data-table/ng-data-table.component';
import { User, USER_SERIALIZABLE_BUILDER } from '../../models/user';
import {
  IRequestClient,
  RequestClient,
  getRessources,
  postRessource,
  deleteRessource,
  putRessource,
  getRessource
} from '../../../contracts/abstract-request-client';
import { HttpRequestService } from '../../../http/core';
import { isDefined } from '../../../utils/type-utils';
import { IResponseBody } from '../../../http/contracts/http-response-data';
import { Injectable, Inject } from '@angular/core';
import { Store } from '../../../store';
import { ISerializableBuilder } from '../../../built-value/contracts/serializers';
import { SessionStorage } from '../../../storage/core/session-storage.service';
@Injectable()
export class ApplicationUsersService extends RequestClient
  implements IRequestClient {

  public readonly ressourcesPath: string = 'users';
  public readonly dataSource: IDataSourceService<ISource<User>>;

  /**
   * @description Service initializer
   */
  constructor(
    private client: HttpRequestService,
    private cache: SessionStorage,
    private store: Store<User>,
    @Inject(USER_SERIALIZABLE_BUILDER) private userBuilder: ISerializableBuilder<User>
  ) {
    super();
  }

  /**
   * @description Get a user based on it unique identifier
   * @param id [[number|string]]
   */
  public getUser(id: number | string) {
    return getRessource<User>(
      this.client,
      `${this.ressourcesPath}/${id}`,
      // (this.dataSource as ApplicationUsersDataSource).usersStorageKey,
      (User.builder() as ISerializableBuilder<User>)
    );
  }

  public getUsers(endpointURL?: string): Promise<User[]> {
    return getRessources<User>(
      this.client,
      `${isDefined(endpointURL) ? endpointURL : this.ressourcesPath}`,
      User.builder() as ISerializableBuilder<User>,
      'users'
    );
  }

  public postUser(requestURL: string, requestBody: object) {
    return postRessource<User>(
      this.client,
      `${isDefined(requestURL) ? requestURL : this.ressourcesPath}`,
      requestBody,
      User.builder() as ISerializableBuilder<User>
    );
  }

  /**
   * @inheritdoc
   */
  deleteUser(id: any): Promise<IResponseBody> {
    return deleteRessource<User>(
      this.client,
      this.ressourcesPath,
      id,
    );
  }

  /**
   * @inheritdoc
   */
  updateUser(requestURL: string, id: any, values: object): Promise<IResponseBody> {
    return putRessource<User>(
      this.client,
      `${isDefined(requestURL) ? requestURL : this.ressourcesPath}`,
      id,
      values,
    );
  }
}
