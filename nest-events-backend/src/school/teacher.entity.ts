import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
@InputType('TeacherInput') // as this entity is also used as input for simplicity
export class Teacher {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @Field(() => [Subject], { nullable: true }) // specify explicitly that this is an array of teachers for graphql
  subjects: Subject[];
}