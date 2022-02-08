public class klasy {
    public static void main(String[] args) {
        Student s = new Student("Jan","Kowalski", 15);
        System.out.println(s.getName());
        System.out.println(s.getLastName());
        System.out.println(s.getAge());

        s.setName("Anna");
        s.setLastName("Nowak");
        s.setAge(12);

        System.out.println(s.getName());
        System.out.println(s.getLastName());
        System.out.println(s.getAge());
    }
    static class Student {
        private String name;
        private String lastName;
        private int age;


        public Student(String name, String lastName, int age) {
            this.name = name;
            this.lastName = lastName;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public String getLastName() {
            return lastName;
        }

        public int getAge() {
            return age;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}
