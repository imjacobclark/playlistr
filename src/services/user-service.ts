import {Injectable} from 'angular2/core';
import {User} from '../models/user-model';

@Injectable()
export class UserService {
    user: User = new User();
}
