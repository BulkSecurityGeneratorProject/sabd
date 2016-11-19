package ro.luptaciu.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

import ro.luptaciu.domain.enumeration.CATEGORY;

/**
 * A DTO for the Question entity.
 */
public class QuestionDTO implements Serializable {

    private Long id;

    @Lob
    private String content;

    private String answer1;

    private String answer2;

    private String answer3;

    private Integer rightAnswer;

    private Boolean isActive;

    private CATEGORY category;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }
    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }
    public String getAnswer3() {
        return answer3;
    }

    public void setAnswer3(String answer3) {
        this.answer3 = answer3;
    }
    public Integer getRightAnswer() {
        return rightAnswer;
    }

    public void setRightAnswer(Integer rightAnswer) {
        this.rightAnswer = rightAnswer;
    }
    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    public CATEGORY getCategory() {
        return category;
    }

    public void setCategory(CATEGORY category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionDTO questionDTO = (QuestionDTO) o;

        if ( ! Objects.equals(id, questionDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
            "id=" + id +
            ", content='" + content + "'" +
            ", answer1='" + answer1 + "'" +
            ", answer2='" + answer2 + "'" +
            ", answer3='" + answer3 + "'" +
            ", rightAnswer='" + rightAnswer + "'" +
            ", isActive='" + isActive + "'" +
            ", category='" + category + "'" +
            '}';
    }
}
