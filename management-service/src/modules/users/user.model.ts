import { AutoIncrement, Column, CreatedAt, DataType, HasMany, HasOne, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
@Table({ tableName: 'users' })
export class User extends Model<User>{
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password: string;

  @Column
  phoneNumber: string;

  @Column(DataType.ENUM('admin', 'manager', 'employee'))
  roles: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // @BelongsToMany(() => Tag, { 
  //   through: {
  //     model: () => TagTaggables,
  //     scope: {
  //       taggable: 'users'
  //     }
  //   },
  //   constraints: false
  // })
  // tags: Tag[];
}