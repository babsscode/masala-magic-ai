export enum SelectedPage {
    Home = "home",
    AboutUs = "aboutus",
    Courses = "courses",
    Register = "register",
    Gallery = "gallery"
}
export interface FoodCardType {
    id: number;
    description: string;
    cuisine: string;
    course: string;
    diet: string;
    ingredients: string;
    imageUrl: string;
    websiteUrl: string;
};
export interface FoodAPIType {
    [key: string]: FoodCardType;
}
export interface FoodAPIwKey {
    name: string;
    data: FoodCardType;
  }