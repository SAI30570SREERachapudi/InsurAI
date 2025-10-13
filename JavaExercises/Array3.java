package codes;
public class Array3 {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2},
            {3, 4}
        };
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                System.out.println("Element: " + matrix[i][j]);
    }
}
